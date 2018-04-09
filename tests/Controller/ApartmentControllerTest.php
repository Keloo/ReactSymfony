<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApartmentControllerTest extends WebTestCase
{
    public function testApartmentResponse()
    {
        $client = static::createClient();
        $client->request('GET', '/api/apartment/list');
        $response = $client->getResponse();
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertJson($response->getContent(), $response->getContent());
    }
}